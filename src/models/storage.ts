
export class Storage {
	private static DOC_PREFIX = "--doc--";

	private static docNameToStorageName(docName:string) : string {
		return Storage.DOC_PREFIX + docName;
	}

	private static docNameFromStorageName(storageName:string) : string {
		return storageName.replace(Storage.DOC_PREFIX, "");
    }

    public static getDocList() : Array<string> {
		var ret = [];
		var n = localStorage.length;
		for(var i = 0; i < n; i++) {
			var key = localStorage.key(i);
			if(key.indexOf(Storage.DOC_PREFIX) === 0) {
				ret.push(Storage.docNameFromStorageName(key));
	    	}
		}

		return ret;
	}
	
	public static saveDoc(docName : string, data:string) : boolean {
		localStorage.setItem(Storage.docNameToStorageName(docName), data);

		return true;
	}

	public static openDoc(docName : string) : string {
        return localStorage.getItem(Storage.docNameToStorageName(docName));
	}

	public static removeDoc(docName : string) : boolean {
		localStorage.removeItem(Storage.docNameToStorageName(docName));

		return true;
	}
}
