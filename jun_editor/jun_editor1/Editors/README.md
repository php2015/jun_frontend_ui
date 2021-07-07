#Editors
其中有百度的 UEditor以及 CKEditor和CKFinder的集成, 有上传图片的实例.<br>
其中UEditor修改了后台的部分代码.<br>
UEditor上传图片地址配置文件在 src-main-webapp-lib-ueditor-jsp 文件夹下的 config.json文件,修改 imagePathFormat 路径.<br>
CKEditor的上传图片配置文件在 WEB-INF目录下, 与web.xml并列, 修改 baseURL 标签.<br>

注:<br>
实例中上传图片的目录默认都是在该项目(即 Editors)下的 upload文件夹中, 可以在 tomcat-webapps目录下的Editors-upload目录中找到所上传的图片.