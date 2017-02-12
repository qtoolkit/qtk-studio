describe('Shape', function() {
    it('test isNearBy', (done) => {
        var shape = new app.Shape();
        var size = app.Shape.POINT_SIZE;

        var result = shape.isNearBy(0, 0, 2, 2) 
            && !shape.isNearBy(0, 0, size+1, 2) 
            && !shape.isNearBy(0, 0, 0, size+1);

        done(result ? null : new Error("Shape test isNearBy failed."));
    });

    it('test notifyChange', (done) => {
        var shape = new app.Shape();
        shape.onChange((evt) => {
            done(null);
        });
        shape.notifyChange();
    });    
});