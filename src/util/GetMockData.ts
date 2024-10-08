import { MOCK_DATA } from "../mockData/MockData";
import { MockData } from "../type/MockDateType";

// 페이지는 1부터 시작함
const PER_PAGE = 10;

export const getMockData = (pageNum: number): Promise<{ datas: MockData[]; isEnd: boolean }> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const datas: MockData[] = MOCK_DATA.slice(PER_PAGE * pageNum, PER_PAGE * (pageNum + 1));
            const isEnd = PER_PAGE * (pageNum + 1) >= MOCK_DATA.length;

            resolve({ datas, isEnd });
        }, 1500);
    });
};
