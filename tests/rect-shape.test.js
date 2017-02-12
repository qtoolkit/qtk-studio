describe('RectShape', function() {
    var json = {
            id : '1',
            name : 'rect',
            type : 'rect',
            isRect : true,
            isLine : false,
            style  : app.RectShapeStyle.create(),
            x  : 1,
            y  : 2,
            w  : 30,
            h  : 40
    };

    var shape = null;
    var ctx = null;
    var HitTestResult = app.HitTestResult;
    
    beforeEach(function() {
        shape = app.RectShape.create();
        shape.fromJson(json);
        ctx = CanvasContext2dMock.get();
    });

    afterEach(function() {
        shape = null;
    });
    
    it('test moveResize', (done) => {
        shape.moveResize(1, 2, 30, 40);
        var result = shape.x === 1 && shape.y === 2 && shape.w === 30 && shape.h === 40;
        done(result ? null : new Error(""));
    });
    
    it('test fromJson', (done) => {
        var result = objEqualJson(shape, json);
        done(result ? null : new Error(""));
    });

    it('test toJson', (done) => {
        var result = objEqualJson(shape.toJson(), json);
        done(result ? null : new Error(""));
    });

    it('test draw', (done) => {
        shape.draw(ctx);
        var expectedStr = '{"cmds":[0,23,1,10,0,9,1,14,36,1,2,30,40,15,16,1],"strs":["white","black"]}';
        var str = ctx.toString();
        var result = str === expectedStr;

        done(result ? null : new Error(str));
    });

    it('test getPointByHitResult', (done) => {
        var p = shape.getPointByHitResult(HitTestResult.TL);
        var result = (p.x == json.x && p.y === json.y);

        p = shape.getPointByHitResult(HitTestResult.TM);
        result = result && (p.x == (json.x + (json.w >> 1)) && p.y === json.y);

        p = shape.getPointByHitResult(HitTestResult.TR);
        result = result && (p.x == (json.x + (json.w)) && p.y === json.y);

        p = shape.getPointByHitResult(HitTestResult.ML);
        result = result && (p.x == json.x && p.y === (json.y+(json.h >>1)));

        p = shape.getPointByHitResult(HitTestResult.MR);
        result = result && (p.x == (json.x+json.w) && p.y === (json.y+(json.h >>1)));

        p = shape.getPointByHitResult(HitTestResult.BL);
        result = result && (p.x == (json.x) && p.y === (json.y+json.h));
        
        p = shape.getPointByHitResult(HitTestResult.BM);
        result = result && (p.x == (json.x+(json.w>>1)) && p.y === (json.y+json.h));

        p = shape.getPointByHitResult(HitTestResult.BR);
        result = result && (p.x == (json.x+(json.w)) && p.y === (json.y+json.h));

        done(result ? null : new Error(""));
    });  

    it('test hitTest', (done) => {
        var rx = Math.floor(Math.random() * app.Shape.POINT_SIZE);
        var ry = Math.floor(Math.random() * app.Shape.POINT_SIZE);

        var result = shape.hitTest(json.x+rx, json.y+ry) === HitTestResult.TL;
        result = result && shape.hitTest(json.x+rx+(json.w>>1), json.y+ry) === HitTestResult.TM;
        result = result && shape.hitTest(json.x+rx+(json.w), json.y+ry) === HitTestResult.TR;

        result = result && shape.hitTest(json.x+rx+(json.w), json.y+ry+(json.h)) === HitTestResult.BR;
        result = result && shape.hitTest(json.x+rx+(json.w >> 1), json.y+ry+(json.h)) === HitTestResult.BM;
        result = result && shape.hitTest(json.x+rx, json.y+ry+(json.h)) === HitTestResult.BL;
        
        result = result && shape.hitTest(json.x+rx, json.y+ry+(json.h >> 1)) === HitTestResult.ML;
        result = result && shape.hitTest(json.x+rx+json.w, json.y+ry+(json.h >> 1)) === HitTestResult.MR;
        result = result && shape.hitTest(json.x+rx+(json.w >> 1), json.y+ry+(json.h >> 1)) === HitTestResult.MM;
        
        done(result ? null : new Error(""));
    });

    it('test saveXYWH', (done) => {
        shape.saveXYWH();
        var result = shape.xSave === json.x && shape.ySave === json.y && shape.wSave === json.w && shape.hSave === json.h;
        done(result ? null : new Error(""));
    });
    
    it('test moveResizeDelta', (done) => {
        var dx = 1;
        var dy = 1;
        var result = true;
        
        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.TL, dx, dy);
        result = result && (shape.xSave+dx) === shape.x && (shape.ySave+dy) === shape.y
            && (shape.wSave-dx) === shape.w && (shape.hSave-dy) === shape.h; 

        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.TM, dx, dy);
        result = result && (shape.xSave) === shape.x && (shape.ySave+dy) === shape.y
            && (shape.wSave) === shape.w && (shape.hSave-dy) === shape.h; 

        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.TR, dx, dy);
        result = result && (shape.xSave) === shape.x && (shape.ySave+dy) === shape.y
            && (shape.wSave+dx) === shape.w && (shape.hSave-dy) === shape.h; 
            
        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.ML, dx, dy);
        result = result && (shape.xSave+dx) === shape.x && (shape.ySave) === shape.y
            && (shape.wSave-dx) === shape.w && (shape.hSave) === shape.h; 
            
        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.MR, dx, dy);
        result = result && (shape.xSave) === shape.x && (shape.ySave) === shape.y
            && (shape.wSave+dx) === shape.w && (shape.hSave) === shape.h; 

        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.BL, dx, dy);
        result = result && (shape.xSave+dx) === shape.x && (shape.ySave) === shape.y
            && (shape.wSave-dx) === shape.w && (shape.hSave+dy) === shape.h; 

        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.BM, dx, dy);
        result = result && (shape.xSave) === shape.x && (shape.ySave) === shape.y
            && (shape.wSave) === shape.w && (shape.hSave+dy) === shape.h; 

        shape.saveXYWH();
        shape.moveResizeDelta(HitTestResult.BR, dx, dy);
        result = result && (shape.xSave) === shape.x && (shape.ySave) === shape.y
            && (shape.wSave+dx) === shape.w && (shape.hSave+dy) === shape.h; 

        done(result ? null : new Error(""));
    });
    
    it('test isInRect', (done) => {
        var rect = app.Rect.create(shape.x, shape.y, shape.w, shape.h);
        var result = shape.isInRect(rect);
        
        rect.init(0, 0, 10, 10);
        result = result && !shape.isInRect(rect);
        
        done(result ? null : new Error(""));
    })
});