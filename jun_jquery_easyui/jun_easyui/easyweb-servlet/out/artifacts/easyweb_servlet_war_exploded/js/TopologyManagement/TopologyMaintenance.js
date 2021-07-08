$(document).ready(function () {
    var canvas = document.getElementById('canvas');
    var stage = new JTopo.Stage(canvas);
    var scene = new JTopo.Scene(stage);
    showJTopoToobar(stage);
})