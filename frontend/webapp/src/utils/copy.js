import { ElNotification } from "element-plus";
export function handleCopy(data) {
    let oInput = document.createElement("input");
    oInput.value = data;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    ElNotification({
        title: "OK",
        message: "房间号已成功复制到剪切板~",
        type: "success",
    });
    oInput.remove();
}
