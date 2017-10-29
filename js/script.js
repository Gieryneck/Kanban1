
$(function() {


	// obiekt tablicy

	var board = {

	    name: 'Kanban Board',

	    $element: $('#board .column-container'),

	    addColumn: function(column) {

	      this.$element.append(column.$element);
	      initSortable();
	    }

	};

	function initSortable() {

	   $('.column-card-list').sortable({

	     connectWith: '.column-card-list',
	     placeholder: 'card-placeholder'

	   }).disableSelection();
	 }

	/*connectWith to atrybut, dzięki któremu możemy wybrać listę, w której będzie działać sortowanie.
	placeholder trzyma nazwę klasy, która pojawia się po najechaniu na puste pole, na które chcemy upuścić 
	przenoszony element.
	*/



	// ADD COLUMN BUTTON


	$('.create-column').on('click', function() {

		console.log('Ding');
		var name = prompt('Enter new column\'s name'),
			column = new Column(name);

		board.addColumn(column);
	});
	
	// RANDOMIZE ID

	function randomString() {

		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
		var str = '';

		for (var i = 0; i < 10; i++) {

			str += chars[Math.floor(Math.random() * chars.length)];
		}

		return str;
	}



























// specjalnie dodalem diva do htmla zeby dzialalo, na var page jest to $element: $('#test'), trzba poprawic zeby bylo cale ok




	function Board(name) {

		console.log('Dong');
		var self = this;
		this.id = randomString();
		this.name = name;
		this.$element = createBoard();

		function createBoard() {

			var $board = $('<div>').addClass('board'),
				$boardTitle = $('<h1>').addClass('board-title').text(self.name),

				$boardDelete = $('<button>').addClass('btn-delete').text('x'),
				$boardAddColumn = $('<button>').addClass('create-column').text('Add a column'),
				$boardColumnContainer = $('<div>').addClass('column-container');


			// EVENTS 

			$boardDelete.on('click', function() {

				self.removeBoard();
			});

			$boardAddColumn.on('click', function() {

				self.addColumn(new Column(prompt('Enter new column\'s name')));
			});


			// JOINING BOARD ELEMENTS

			$board.append($boardTitle)
			        .append($boardDelete)
			        .append($boardAddColumn)
			        .append($boardColumnContainer);

			return $board;
		}
	}


	Board.prototype = {

		removeBoard: function() {

			this.$element.remove();
		},


		addColumn: function(column) {

			this.$element.children('.column-container').append(column.$element);	// prototyp nie jest zagniezdzony w createBoard(), więc możemy użyć 'this' bez utraty kontekstu
			initSortable();
		}
		
	};


	var page = {

		$element: $('#test'),

		addBoard: function(newboard) {

		  console.log('Dung');	
		 
	      this.$element.append(newboard.$element);

	    }
	};


	$('.create-board').on('click', function() {

		console.log('Ding');
		var name = prompt('Enter new board\'s name'),
			newboard = new Board(name);

		page.addBoard(newboard);
	});

































	function Column(name) {

		var self = this; // for nested fctions to avoid 'this' keyword's context loss

		this.id = randomString();
		this.name = name;
		this.$element = createColumn(); // nadajemy klasie właściwość(konkretnie nowy element jQuery) '$element' za pomocą fcji

		function createColumn() {

			var $column = $('<div>').addClass('column'),
				$columnTitle = $('<h2>').addClass('column-title').text(self.name),
				$columnCardList = $('<ul>').addClass('column-card-list'),

				$columnDelete = $('<button>').addClass('btn-delete').text('x'),
				$columnAddCard = $('<button>').addClass('add-card').text('Add a card');


			// EVENTS - funkcje wywoływane tymi eventami są zawarte w COLUMN CLASS PROTOTYPES

			$columnDelete.on('click', function() {

				self.removeColumn();
			});

			$columnAddCard.on('click', function() {

				self.addCard(new Card(prompt('Enter new card\'s name')));
			});


			// JOINING COLUMN ELEMENTS

			$column.append($columnTitle)
			        .append($columnDelete)
			        .append($columnAddCard)
			        .append($columnCardList);

			return $column;
		}
	}



	// COLUMN CLASS PROTOTYPES


	Column.prototype = {	

		addCard: function(card) {

			this.$element.children('ul').append(card.$element);	// prototyp nie jest zagniezdzony w createColumn(), więc możemy użyć 'this' bez utraty kontekstu
		},

		removeColumn: function() {

			this.$element.remove();
		}
	};








	// CARD Contructor fction


	function Card(description) {

		var self = this;

	    this.id = randomString();
	    this.description = description;
	    this.$element = createCard();

	    function createCard() {

	    	var $card = $('<li>').addClass('card'),
			    $cardDescription = $('<p>').addClass('card-description').text(self.description),
			    $cardDelete = $('<button>').addClass('btn-delete').text('x');

		    //EVENT

		    $cardDelete.click(function(){
		           		self.removeCard();
		    });

		    // SCALANIE 

		    $card.append($cardDelete)
		    	 .append($cardDescription);

		    return $card;
		}
	}



	// PROTOTYPE FOR CARD CLASS

	Card.prototype = {

		removeCard: function() {

			this.$element.remove();
		}
	};









// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);



	

});