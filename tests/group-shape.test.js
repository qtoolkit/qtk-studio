describe('GroupShape', function() {
    var group = null;
    var child1 = null;
    var child2 = null;

    beforeEach(function() {
        group = app.GroupShape.create();
        child1 = app.RectShape.create();
        child2 = app.RectShape.create();
        child1.name = "child1";
        child2.name = "child2";
        group.addShape(child1);
        group.addShape(child2);
    });

    afterEach(function() {
        group = null;
        child1 = null;
        child2 = null;
    });

    it('test addShape', (done) => {
        var result = group.shapes.length === 2;
        done(result ? null : new Error(""));
    });
    
    it('test removeShape', (done) => {
        var result = group.shapes.length === 2;
        
        group.removeShape(child1);
        result = result && group.shapes.length === 1;

        group.removeShape(child2);
        result = result && group.shapes.length === 0;

        done(result ? null : new Error(""));
    });

    it('test findChildByName', (done) => {
        result = group.findChildByName(child1.name) === child1 
            && group.findChildByName(child2.name) === child2
        done(result ? null : new Error(""));
    });
    
    it('test findChildByID', (done) => {
        result = group.findChildByID(child1.id) === child1 
            && group.findChildByID(child2.id) === child2
        done(result ? null : new Error(""));
    });
    
    it('test removeAllShapes', (done) => {
        var result = group.shapes.length === 2;
        group.removeAllShapes();
        result = result && group.shapes.length === 0;
        
        done(result ? null : new Error(""));
    });
    
    it('test countSelectedShapes', (done) => {
        var result = group.countSelectedShapes() === 0;
        
        child1.selected = Date.now();
        child2.selected = Date.now();
        result = result && group.countSelectedShapes() === 2;
        child1.selected = 0;
        child2.selected = 0;
        result = result && group.countSelectedShapes() === 0;
        
        done(result ? null : new Error(""));
    });
    
    it('test selectNone/selecteAll', (done) => {
        group.selectAll();
        var result = group.countSelectedShapes() === 2;
        
        group.selectNone();
        result = result && group.countSelectedShapes() === 0;
        
        done(result ? null : new Error(""));
    });

    it('test selectShape', (done) => {
        group.selectShape(child1, true);
        var result = group.countSelectedShapes() === 1;
        
        group.selectShape(child2, true);
        result = result && group.countSelectedShapes() === 1;
        
        group.selectShape(child1, false);
        var result = group.countSelectedShapes() === 2;
        
        done(result ? null : new Error(""));
    });
    
    it('test getSelectedRectShapes', (done) => {
        group.selectAll();
        var arr = group.getSelectedRectShapes();
        var result = arr.length === 2;

        done(result ? null : new Error(""));
    });
    
    it('test toJson', (done) => {
        var arr = group.toJson();
        var result = arr.length === 2
            && objEqualJson(child1, arr[0])
            && objEqualJson(child2, arr[1]);
             
        done(result ? null : new Error(""));
    });

    it('test fromJson', (done) => {
        var json = group.toJson();
        group.removeAllShapes();
        group.fromJson(json);
        var result = group.shapes.length;

        done(result ? null : new Error(""));
    });
   
    
    it('test findShapeByPoint', (done) => {
        child1.x = 100;
        child1.y = 100;
        child2.x = child1.x;
        child2.y = child1.y;
        var result = child2 === group.findShapeByPoint(child1.x, child1.y);

        child1.x = 300;
        child1.y = 300;
        result = result && child1 === group.findShapeByPoint(child1.x, child1.y);

        done(result ? null : new Error(""));
    });
});