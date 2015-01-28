(function($) {

  var PI = function  () {

  }

  PI.prototype.AddSong = {
    cfg:{
      addBtn : $('#add-button'),
    },

    init: function () {
      var self = this;
          self.events()
    },
    publish: function(data) {
      $publish('addedSong', {files: e.target.files})
    },

    upadtePlaylist: function(data) {
      var self = this;
      console.log(data);
    },

    events: function() {
      var self = this;
          self.cfg.addBtn.on('change', function(e) {
            self.publish(e)
          });
      $subcribe('songAdded', function (e, data) {
        self.upadtePlaylist(data)
      });
    }

  };

  PI.prototype.PlayListControls {
    cfg: {

    },

    songPaused = function () {
      // body...
    },

    songPlayed = function () {
      // body...
    },

    moveForward = function () {
      // body...
    },

    moveBackward = function () {
      // body...
    },

    init: {

    },

    events{

    }
  };

}(jQuery));
