import clone from "@/lib/clone";
const localStorageKeyName = 'recordList'

const recordStore = {

    recordList: [] as RecordItem[],
    fetch() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList
    },
    createRecord(record: RecordItem){
        const record2: RecordItem = clone(record)
        record2.createdAt = new Date().toISOString();
        this.recordList?.push(record2)
        recordStore.save()
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList))
    }
};
recordStore.fetch()

export default recordStore