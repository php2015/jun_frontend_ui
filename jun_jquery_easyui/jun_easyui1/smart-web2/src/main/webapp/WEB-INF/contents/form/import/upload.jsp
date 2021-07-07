<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<div class="wrap-content-dialog" id="form-import-upload-wrap">
    <form class="form-horizontal" enctype="multipart/form-data" role="form" id="form-import-upload" method="post" action="form/import/upload.json">
        <input type="hidden" name="formId" value="${formId}" />
        <div class="form-group">
            <label for="import-upload" class="col-sm-2 control-label">上传文件</label>
            <div class="col-sm-10">
                <input type="file" class="form-control require" id="import-upload" data-label-name="上传文件" name="importFile" placeholder="上传文件">
            </div>
        </div>
        <div class="text-center p-t-10">
            <button type="button" class="btn btn-primary cnoj-form-submit" data-fun="handleImportResult"><i class="glyphicon glyphicon-ok-sign"></i> 确定</button>
        </div>
    </form>
</div>
<script type="text/javascript">
    function handleImportResult() {
        location.reload();
    }
</script>