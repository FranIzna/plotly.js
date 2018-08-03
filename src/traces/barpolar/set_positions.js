/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Registry = require('../../registry');
var setGroupPositions = require('../bar/set_positions').setGroupPositions;
var extendFlat = require('../../lib').extendFlat;

module.exports = function setPositions(gd, polarLayout) {
    var calcdata = gd.calcdata;
    var cdRadial = [];
    var cdAngular = [];

    for(var i = 0; i < calcdata.length; i++) {
        var cdi = calcdata[i];
        var trace = cdi[0].trace;

        if(trace.visible === true && Registry.traceIs(trace, 'bar')) {
            if(trace.orientation === 'radial') {
                cdRadial.push(cdi);
            } else {
                cdAngular.push(cdi);
            }
        }
    }

    // to make _extremes is filled in correctly so that
    // polar._subplot.radialAxis can get auotrange'd
    // TODO clean up!
    // I think we want to call getAutorange on polar.radialaxis
    // NOT on polar._subplot.radialAxis
    var rAxis = extendFlat({}, polarLayout.radialaxis, {_id: 'x'});
    var aAxis = polarLayout.angularaxis;

    setGroupPositions(gd, aAxis, rAxis, cdRadial);
    setGroupPositions(gd, rAxis, aAxis, cdAngular);
};
