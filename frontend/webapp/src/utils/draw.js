import { useStore } from "vuex"
// 绘图函数，接收canvasNode节点和配置
export function draw(canvas) {
    const config = useStore().state.drawConfig
    const c = canvas.getContext('2d')
    canvas.onmousedown = (e) => {
        // 开始一条路径
        c.beginPath()
        c.strokeStyle = config.color
        c.lineWidth = config.width
        // 获取点的起始坐标
        c.moveTo(e.offsetX, e.offsetY)
        canvas.onmousemove = e => {
            c.lineTo(e.offsetX, e.offsetY)
            c.stroke()
        }
        canvas.onmouseup = () => {
            // 结束路径
            c.closePath()
            canvas.onmousemove = null
        }
    }
}

// 卸载画板功能
export function unmountedDraw(canvas) {
    canvas.onmousedown = canvas.onmousemove = canvas.onmouseup = null
}

// 重置画布
export function clearCanvas(canvas) {
    console.log(canvas);
    //重新赋值宽高以重置画布
    const w = canvas.width
    canvas.width = w
}