function reduceWaterservicesModel (element)
{
    return {
        name: element.sourceInfo.siteName,
        id: element.name,
        latitude: element.sourceInfo.geoLocation.geogLocation.latitude,
        longitude: element.sourceInfo.geoLocation.geogLocation.longitude,
        isFavorite: element.isFavorite,
        measuredData: {
            unit: element.variable.unit.unitCode,
            unitDescription: element.variable.variableDescription,
            measurements: element.values.map(measurement=>{
                return {
                    measuredValue: measurement.value[0].value,
                    dateMeasured: measurement.value[0].dateTime
                }
            })
        }
    }
};

module.exports = reduceWaterservicesModel;