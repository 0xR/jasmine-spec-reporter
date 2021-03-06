var SpecMetrics = function () {
  this.startTime = null;
  this.specStartTime = null;
  this.duration = null;
  this.successfulSpecs = 0;
  this.failedSpecs = 0;
  this.skippedSpecs = 0;
  this.executedSpecs = 0;
  this.totalSpecs = 0;
};

SpecMetrics.prototype = {
  start: function () {
    this.startTime = (new Date()).getTime();
  },

  stop: function () {
    this.duration = this.formatDuration((new Date()).getTime() - this.startTime);
    this.totalSpecs = this.failedSpecs + this.successfulSpecs + this.skippedSpecs;
    this.executedSpecs = this.failedSpecs + this.successfulSpecs;
  },

  startSpec: function () {
    this.specStartTime = (new Date()).getTime();
  },

  stopSpec: function (spec) {
    spec.duration = this.formatDuration((new Date()).getTime() - this.specStartTime);
  },

  formatDuration: function (durationInMs) {
    var duration = '', durationInSecs, durationInMins, durationInHrs;
    durationInSecs = durationInMs / 1000;
    if (durationInSecs < 1) {
      return durationInSecs + ' secs';
    }
    durationInSecs = Math.round(durationInSecs);
    if (durationInSecs < 60) {
      return durationInSecs + ' secs';
    }
    durationInMins = Math.floor(durationInSecs / 60);
    durationInSecs = durationInSecs % 60;
    if (durationInSecs) {
      duration = ' ' + durationInSecs + ' secs';
    }
    if (durationInMins < 60) {
      return durationInMins + ' mins' + duration;
    }
    durationInHrs = Math.floor(durationInMins / 60);
    durationInMins = durationInMins % 60;
    if (durationInMins) {
      duration = ' ' + durationInMins + ' mins' + duration;
    }
    return durationInHrs + ' hours' + duration;
  }
};

module.exports = SpecMetrics;
