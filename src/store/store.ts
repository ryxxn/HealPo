import { create } from 'zustand';
import { devtools } from 'zustand/middleware'
import { getLocalData } from '../util';


export type SettingDataType = {
    name: string,
    index: number,
}

// - MySetList : number[] → id(number) 배열
export type MySetType = {
    id: string // PK
    name: string // 세트 이름
    set: number // 세트 수 index
    setBreakTime: number // 세트 간 휴식 시간 index
    repeat: number // 반복 횟수 index
    repeatList: SettingDataType[] // [{name : ‘UP(DOWN)’, index : 2}, {name : ‘DOWN(UP)’, index : 2}]
    iconNum: number // 아이콘 번호
}

const mySet: MySetType[] = [{
    id: "1",
    name: "스쿼트",
    set: 10,
    setBreakTime: 1,
    repeat: 10,
    repeatList: [
        { name: "UP(DOWN)", index: 2 },
        { name: "HOLD", index: 2 },
        { name: "DOWN(UP)", index: 2 },
    ],
    iconNum: 5
}]


interface SettingStoreType {
    totalData:MySetType[]
    fetchData:()=>void,
    data: MySetType,
    setData: (d: MySetType) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    reset: () => void,
}

/** Setting Store */
const SettingStore = (set: any): SettingStoreType => ({
    totalData:[],
    fetchData: () => {
        const d = getLocalData("mySetData") ?? [];
        set({totalData: d})
    },
    data: {
        id: "",
        name: "",
        set: 0,
        setBreakTime: 0,
        repeat: 9,
        repeatList: [
            { name: "UP(DOWN)", index: 0 },
            { name: "DOWN(UP)", index: 0 },
        ],
        iconNum: -1
    },
    setData: (d: any) => {
        set({ data: d })
    },
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),
    reset: () => set({
        data: {
            id: "",
            name: "",
            set: 0,
            setBreakTime: 0,
            repeat: 9,
            repeatList: [
                { name: "UP(DOWN)", index: 0 },
                { name: "DOWN(UP)", index: 0 },
            ],
            iconNum: -1
        },
    })
})

export const useSettingStore = create(devtools(SettingStore));

