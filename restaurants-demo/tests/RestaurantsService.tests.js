describe('Restaurants Service Unit Tests', function(){
    var Burgers;
 
    beforeEach(module('RestaurantsService'));

    beforeEach(inject(function (_Burgers_) {
        Burgers = _Burgers_;
    }));

    it('can parse a GPS coordinate RestaurantsService', inject(function(Burgers) {
        expect(Burgers).toBeDefined();
        expect(Burgers.parseGps("5.33,3.44")).toEqual(["5.33", "3.44"]);
    }));

});

