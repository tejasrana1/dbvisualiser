export const upperBound = (id, arr) => {
    let ans = 500;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > id) {
            ans = Math.min(arr[i], ans);
        }
    }
    if (ans === 500)
        ans = 0;
    return ans;
}