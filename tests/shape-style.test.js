describe('ShapeStyle', function() {
    var json = {
        lineWidth : 1, 
        lineColor : 'gold',
        textColor : 'blue',
        fontSize : 16,
        fontFamily : "Sans",
        bold : true,
        italic : false,
        underline : false            
    };

    it('test from json', (done) => {
        var style = new app.ShapeStyle();
        var result = objEqualJson(style.fromJson(json), json);
        done(result ? null : new Error("shape style test from json failed"));
    });
    
    it('test to json', (done) => {
        var style = new app.ShapeStyle();
        var result = objEqualJson(style.fromJson(json).toJson(), json);
        done(result ? null : new Error("shape style test to json failed"));
    });
    
    it('test font', (done) => {
        var style = new app.ShapeStyle();
        style.fromJson(json);
        var result = style.font === "Bold " + style.fontSize + "px " + style.fontFamily;
        done(result ? null : new Error("shape style test font failed:" + style.font));
    })
});