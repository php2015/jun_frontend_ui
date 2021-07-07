let name='Jack';
/*let age=11;
let func=function () {
    return `姓名：${name}，年龄：${age}`
}
let myClass=class myClass{
    static a='呵呵'
}*/

export default{
    name:"jack",
        age:11,
        getInfo(){
        return `姓名：${this.name}，年龄：${this.age}`
    }
}
