
async function fetchData() {
    // 서버에서 데이터를 가져오는 비동기 작업
}

async function displayData() {
    try {
        // 데이터를 가져온 후에 화면에 표시하는 작업
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error('데이터 가져오기 실패:', error);
    }
}

// displayData 함수 호출
displayData();
