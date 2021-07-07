/*********************************************************
* version 2.1 - By Kant@SeekRoad
* 修改日期：2018-2-18
**********************************************************/

$(function(){
    $('#navtree').tree({
        url:app_url+'/index/getmenu',
        animate:true,
        onDblClick: function(node){
            $('#navtree').tree('toggle', node.target);
        },
        onClick: function(node){
            if(!node.id){
                var node_iconCls = 'icon icon-tab';
                if(node.iconCls){ node_iconCls = node.iconCls; }
                contPageOpen(app_url+'/sqlcode/content/'+node.attributes.id,node.text,node_iconCls);
            }
        }/*,
        onContextMenu: function(e, node){
            e.preventDefault();
            // select the node
            $('#navtree').tree('select', node.target);
            // display context menu
            $('#navtree_mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }*/
    });
});

/*
<div id="navtree_mm" class="easyui-menu" style="width:120px;">
    <div onclick="append()" data-options="iconCls:'icon-add'">Append</div>
    <div onclick="remove()" data-options="iconCls:'icon-remove'">Remove</div>
</div>
*/
