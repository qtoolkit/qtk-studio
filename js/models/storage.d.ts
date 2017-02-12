export declare class Storage {
    private static DOC_PREFIX;
    private static docNameToStorageName(docName);
    private static docNameFromStorageName(storageName);
    static getDocList(): Array<string>;
    static saveDoc(docName: string, data: string): boolean;
    static openDoc(docName: string): string;
    static removeDoc(docName: string): boolean;
}
