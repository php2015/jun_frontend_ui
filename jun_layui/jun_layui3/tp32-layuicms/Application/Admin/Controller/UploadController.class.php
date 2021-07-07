<?php
namespace Admin\Controller;
use Think\Controller;

class UploadController extends Controller 
{
	// 文件上传
    public function uploadFile()
    {
        $files = $_FILES['file'];
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728 ;// 设置附件上传大小
        $upload->exts = array('doc', 'docx', 'xls','xlsx', 'zip','rar');// 设置附件上传类型
        $upload->rootPath = './'; // 设置附件上传根目录
        $upload->savePath = '/Public/uploads/files/'; // 设置附件上传（子）目录
        $info   =   $upload->uploadOne($files);
        if(!$info) {
            // 上传错误抛出异常
            throw new \Exception($upload->getError());

        }else{
            // 上传成功 获取上传文件信息
            $infopath = $info['savepath'].$info['savename'];
            return retJson(0,'上传成功',$infopath);
        }
    }


    // 图片上传
    public function uploadImage()
    {
        $files = $_FILES['img'];
        $upload = new \Think\Upload();// 实例化上传类
        $upload->maxSize = 3145728 ;// 设置附件上传大小
        $upload->exts = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->rootPath = './'; // 设置附件上传根目录
        $upload->savePath = '/Public/uploads/images/'; // 设置附件上传（子）目录
        $info   =   $upload->uploadOne($files);
        if(!$info) {
            // 上传错误抛出异常
            throw new \Exception($upload->getError());

        }else{
            // 上传成功 获取上传文件信息
            $infopath = $info['savepath'].$info['savename'];
            return retJson(0,'上传成功',$infopath);
        }
    }
}