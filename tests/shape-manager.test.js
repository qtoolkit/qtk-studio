describe('ShapeManager', function() {
    var manager = null;
    var child1 = null;
    var child2 = null;
    var child3 = null;

    beforeEach(function() {
        manager = app.ShapeManager.create();
        child1 = app.RectShape.create();
        child2 = app.RectShape.create();
        child3 = app.RectShape.create();
        child1.name = "child1";
        child2.name = "child2";
        child3.name = "child3";
        manager.addShape(child1);
        manager.addShape(child2);
        manager.addShape(child3);

        manager.execCmd = function(cmd) {
            cmd.doit();
        }
    });

    afterEach(function() {
        manager = null;
        child1 = null;
        child2 = null;
        child3 = null;
    })

    it('test cut', (done) => {
        child1.selected = Date.now();
        manager.cut();
        var result = manager.shapes.length === 2 && manager.clipBoard.length === 1;
        done(result ? null : new Error(""));
    })
    
    it('test copy', (done) => {
        child1.selected = Date.now();
        manager.copy();
        var result = manager.shapes.length === 3 && manager.clipBoard.length === 1;
        done(result ? null : new Error(""));
    })
    
    it('test paste', (done) => {
        child1.selected = Date.now();
        manager.copy();
        manager.paste();
        var result = manager.shapes.length === 4 && manager.clipBoard.length === 1;
        
        done(result ? null : new Error(""));
    })
    
    it('test del', (done) => {
        child1.selected = Date.now();
        manager.del();
        var result = manager.shapes.length === 2;
        done(result ? null : new Error(""));
    })
    
});