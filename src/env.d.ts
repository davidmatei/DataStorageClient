/// <reference types="vite/client" />

export interface IElectronAPI {
    connectToBlobStorage: () => void,
    uploadBlobToDataStorage: () => void
}


declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}
