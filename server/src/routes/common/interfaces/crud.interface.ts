export interface CRUD {
    list: (limit: number, page: number) => Promise<any>;
    create: (resource: any) => Promise<any>;
    putByStoreCode: (id: string, resource: any) => Promise<string>;
    readByStoreCode: (id: string) => Promise<any>;
    deleteByStoreCode: (id: string) => Promise<string>;
    patchByStoreCode: (id: string, resource: any) => Promise<string>;
}
