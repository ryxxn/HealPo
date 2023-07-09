/** 깊은 복사 함수 */
export const deepcopy = (object: any) => {
  if (object === null || typeof object !== "object") {
    return object;
  }
  // 객체인지 배열인지 판단
  const copy: any = Array.isArray(object) ? [] : {};

  for (let key of Object.keys(object)) {
    copy[key] = deepcopy(object[key]);
  }

  return copy;
}

/** 로컬스토리지 사용 함수*/
export const getLocalData = (DBName: string): any => {
  const data = localStorage.getItem(DBName);
  if (data) {
    return JSON.parse(data);
  }
  return null; // 또는 다른 처리 방식으로 대체 가능
};

export const setLocalData = (DBName: string, storage: any) => {
  localStorage.setItem(DBName, JSON.stringify(storage));
}
