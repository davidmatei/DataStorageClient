import {BlobServiceClient, ContainerClient} from "@azure/storage-blob";
import {v1 as uuidv1} from "uuid";
import {config} from "dotenv";

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

config()

function createUniqueContainerName() {
    const containerName = "quickstart" + uuidv1();
    console.log("\nCreating container...");
    console.log("\t", containerName);
    return containerName;
}

function getReferenceToContainer(blobServiceClient: BlobServiceClient, containerName: string) {
    return blobServiceClient.getContainerClient(containerName);
}

async function createContainer(containerClient: ContainerClient) {
    return await containerClient.create();
}

function createBlobServiceClient() {
    return BlobServiceClient.fromConnectionString(
        AZURE_STORAGE_CONNECTION_STRING
    );
}

function checkConnectionToAzureStorageAccount() {
    if (azureConnectionStringExists()) {
        throw Error("Azure Storage Connection string not found");
    }
}

function azureConnectionStringExists() {
    return !AZURE_STORAGE_CONNECTION_STRING;
}

async function connectToAzureStorageAccountAndCreateContainer(): Promise<void> {
     console.log("OK")
   /* checkConnectionToAzureStorageAccount();
    const blobServiceClient = createBlobServiceClient();
    const containerName = createUniqueContainerName();
    const containerClient = getReferenceToContainer(blobServiceClient, containerName);
    const createContainerResponse = await createContainer(containerClient);
    console.log(`Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`);*/
}

async function listBlobsInAContainer(containerClient: ContainerClient) {
    console.log("\nListing blobs...");

// List the blob(s) in the container.
    for await (const blob of containerClient.listBlobsFlat()) {

        // Get Blob Client from name, to get the URL
        const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

        // Display blob name and URL
        console.log(`\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`);
    }
}

async function uploadBlobToContainer() {
    // Create a unique name for the blob
    const blobName = "parent/child.txt";
    const containerName = createUniqueContainerName();
    const blobServiceClient = createBlobServiceClient();

    const containerClient = getReferenceToContainer(blobServiceClient, "newcontainer");

    // Get a block blob client
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Display blob name and url
    console.log(`\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`);

    // Upload data to the blob
    const data = "Hello, World!";
    const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
    console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);
    await listBlobsInAContainer(containerClient);
}








export {connectToAzureStorageAccountAndCreateContainer, uploadBlobToContainer};