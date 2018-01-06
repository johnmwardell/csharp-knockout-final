function Container(number, weight, measure, pieceCount, pieceType, seal) {
    var self = this;
    self.number = number;
    self.measure = ko.observable(measure);
    self.weight = ko.observable(weight);
    self.pieceCount = ko.observable(pieceCount);
    self.pieceType = pieceType;
    self.seal = seal;

    self.formattedMT = ko.computed(function () {
        if (self.measure().measureName != "MT") {
            var conversion = self.measure().toMT;
            MT = self.weight() * conversion;
            return MT ? MT.toFixed(3) + " MT" : "";
        }
    });
}

function ContainerEntryViewModel() {
    var self = this;

    self.availableMeasures = [
        { measureName: "MT", toMT: 1 },
        { measureName: "LBS", toMT: 0.00045359237 },
        { measureName: "ST", toMT: 0.90718474 }
    ];

    self.containerList = ko.observableArray([new Container("", "", self.availableMeasures[0], 0, "", "")]);

    self.addContainer = function () {
        self.containerList.push(new Container("", "", self.availableMeasures[0], 0, "", ""));
    }

    self.removeContainer = function (cont) { self.containerList.remove(cont) }

    self.totalWeight = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.containerList().length; i++) {
            var conversion = self.containerList()[i].measure().toMT;
            MT = self.containerList()[i].weight() * conversion;
            total += MT;
        }
        return total;
    });

    self.totalCount = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.containerList().length; i++) {
            if (self.containerList()[i].pieceCount() > 0) {
                total += parseInt(self.containerList()[i].pieceCount());
            }
        }
        return total;
    });

    self.loadContainers = function () {
        var i = 0;
        $.getJSON("Home/LoadContainers", function (data) {
            $(data).each(function (index, element) {
                var newMeasure;
                switch (element.Measure) {
                    case "MT":
                        newMeasure = self.availableMeasures[0];
                        break;
                    case "LBS":
                        newMeasure = self.availableMeasures[1];
                        break;
                    case "ST":
                        newMeasure = self.availableMeasures[2];
                        break;
                    default:
                        newMeasure = self.availableMeasures[0];
                        break;
                }
                self.containerList.unshift(new Container(element.Number, element.Weight, newMeasure, element.PieceCount, element.PieceType, element.Seal));
            });
        });
    }
}

ko.applyBindings(new ContainerEntryViewModel());