jasmine.getFixtures().fixturesPath = '../tests/fixtures';
jasmine.getStyleFixtures().fixturesPath = '../dist/css';

describe("Api", function() {

	var slider;
	var wrapper;
	var slides;
	var api;
	var index;
	var options;

	beforeEach(function () {
		loadFixtures('base.html');
		loadStyleFixtures('glide.css');

		options = {
			animationDuration: 10,
			autoplay: 200,
		};

		wrapper = $('.glide').children('.glide__wrapper');
		slides = wrapper.children();
		slider = $('.glide').glide(options);
		api = slider.data('glide_api');
		index = slides.index($('.active')) + 1;
	});


	it("Api.current should return index of active slide", function(done) {
		setTimeout(function(){
			api.go('>');
			setTimeout(function(){
				expect(api.current()).toEqual(slides.index($('.active')) + 1);
				done();
			}, options.animationDuration*5);
		}, options.animationDuration*5);
	});


	it("Api.go('>') should move slide one forward", function(done) {
		setTimeout(function(){

			api.go('>');

			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toEqual(index + 1);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('>>') should scroll slider to the end (last element)", function(done) {

		setTimeout(function(){

			api.go('>>');

			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toEqual(slides.length);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);

	});


	it("Api.go('<') should move slide one backward", function(done) {
		setTimeout(function(){

			api.go('<');

			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toEqual(slides.length);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('<<') should scroll slider to start (first element)", function(done) {

		setTimeout(function(){

			api.go('=' + slides.length);

			setTimeout(function(){

				api.go('<<');

				setTimeout(function(){
					expect(slides.index($('.active')) + 1).toEqual(1);
					done();
				}, options.animationDuration*5);

			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.go('=3') should move slide to third slide", function(done) {
		setTimeout(function(){

			api.go('=3');

			setTimeout(function(){
				expect(slides.index($('.active')) + 1).toEqual(3);
				done();
			}, options.animationDuration*5);

		}, options.animationDuration*5);
	});


	it("Api.pause should stop autoplay", function() {
		api.play();
		expect(api.pause()).toBeUndefined();
	});


	it("Api.play should start autoplay", function(done) {
		api.pause();
		api.play();
		setTimeout(function(){
			expect(api.play()).toBeTruthy();
			done();
		}, options.autoplay + 10);
	});


});
