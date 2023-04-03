/**
 * placeholde responses for the project. To be swapped out by actual
 * responses as progresses. best viewed collapsed
 */
const responses = {
    home: {
        "links": [
            {
                "href": "http://data.example.org/",
                "rel": "self",
                "type": "application/json",
                "title": "this document"
            },
            {
                "href": "http://data.example.org/api",
                "rel": "service",
                "type": "application/openapi+json;version=3.0",
                "title": "the API definition"
            },
            {
                "href": "http://data.example.org/conformance",
                "rel": "conformance",
                "type": "application/json",
                "title": "WFS 3.0 conformance classes implemented by this server"
            },
            {
                "href": "http://data.example.org/groups",
                "rel": "data",
                "type": "application/json",
                "title": "List of available groups"
            },
            {
                "href": "http://data.example.org/collections",
                "rel": "data",
                "type": "application/json",
                "title": "List the available collections"
            }
        ]
    },
    conformance: {
        "conformsTo": [
            "http://www.opengis.net/spec/wfs-1/3.0/req/core",
            "http://www.opengis.net/spec/wfs-1/3.0/req/oas30",
            "http://www.opengis.net/spec/wfs-1/3.0/req/html",
            "http://www.opengis.net/spec/wfs-1/3.0/req/geojson"
        ]
    },
    groups: {
        "links": [
            {
                "href": "http://data.example.org/collections.json",
                "rel": "self",
                "type": "application/json",
                "title": "this document"
            },
            {
                "href": "http://data.example.org/collections.html",
                "rel": "alternate",
                "type": "text/html",
                "title": "this document as HTML"
            },
            {
                "href": "http://schemas.example.org/1.0/foobar.xsd",
                "rel": "describedBy",
                "type": "application/xml",
                "title": "XML schema for Acme Corporation data"
            }
        ],
        "members": [
            [
                {
                    "href": "string",
                    "rel": "prev",
                    "type": "application/geo+json",
                    "hreflang": "en"
                }
            ]
        ]
    },
    groups_groupId: {
        "links": [
            {
                "href": "http://data.example.org/collections.json",
                "rel": "self",
                "type": "application/json",
                "title": "this document"
            },
            {
                "href": "http://data.example.org/collections.html",
                "rel": "alternate",
                "type": "text/html",
                "title": "this document as HTML"
            },
            {
                "href": "http://schemas.example.org/1.0/foobar.xsd",
                "rel": "describedBy",
                "type": "application/xml",
                "title": "XML schema for Acme Corporation data"
            }
        ],
        "members": [
            [
                {
                    "href": "string",
                    "rel": "prev",
                    "type": "application/geo+json",
                    "hreflang": "en"
                }
            ]
        ]
    },
    collections: {
        "links": [
            {
                "href": "http://data.example.org/collections.json",
                "rel": "self",
                "type": "application/json",
                "title": "this document"
            },
            {
                "href": "http://data.example.org/collections.html",
                "rel": "alternate",
                "type": "text/html",
                "title": "this document as HTML"
            },
            {
                "href": "http://schemas.example.org/1.0/foobar.xsd",
                "rel": "describedBy",
                "type": "application/xml",
                "title": "XML schema for Acme Corporation data"
            }
        ],
        "collections": [
            {
                "id": "GFSSurf",
                "title": "GFS Surface Data",
                "description": "NOAA Global Forecast surface values",
                "links": [
                    {
                        "href": "http://data.example.org/collections/observations",
                        "rel": "item",
                        "type": "application/geo+json",
                        "title": "Observation data"
                    },
                    {
                        "href": "http://example.org/concepts/building.html",
                        "rel": "describedBy",
                        "type": "text/html",
                        "title": "List of available observation types"
                    }
                ],
                "extent": {
                    "spatial": {
                        "bbox": [
                            [
                                -180,
                                -90,
                                180,
                                90
                            ]
                        ],
                        "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                    },
                    "temporal": {
                        "interval": [
                            [
                                "2011-11-11T12:22:11Z",
                                null
                            ]
                        ],
                        "trs": "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian"
                    }
                },
                "crs": [
                    {
                        "name": "CRS84",
                        "wkt": "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"
                    }
                ]
            }
        ]
    },
    collections_collectionId: {
        "links": [
          {
            "href": "http://data.example.org/collections/observations",
            "rel": "item",
            "type": "application/geo+json",
            "title": "Observation data"
          },
          {
            "href": "http://example.org/concepts/building.html",
            "rel": "describedBy",
            "type": "text/html",
            "title": "List of available observation types"
          }
        ],
        "instances": [
          {
            "id": "2019-08-01T00:00:00Z",
            "title": "2019-08-01T00:00:00Z model run",
            "description": "NOAA Global Forecast surface values from the 2019-08-01T00:00:00Z model run",
            "links": [
              {
                "href": "http://data.example.org/collections/observations",
                "rel": "item",
                "type": "application/geo+json",
                "title": "Observation data"
              },
              {
                "href": "http://example.org/concepts/building.html",
                "rel": "describedBy",
                "type": "text/html",
                "title": "List of available observation types"
              }
            ],
            "extent": {
              "spatial": {
                "bbox": [
                  [
                    -180,
                    -90,
                    180,
                    90
                  ]
                ],
                "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
              },
              "temporal": {
                "interval": [
                  [
                    "2011-11-11T12:22:11Z",
                    null
                  ]
                ],
                "trs": "http://www.opengis.net/def/uom/ISO-8601/0/Gregorian"
              }
            }
          }
        ],
        "name": "Metar data",
        "title": "Metar observations",
        "parameters": [
          "string"
        ]
    },
    collections_collectionId_items: {
        "type": "FeatureCollection",
        "links": [
          {
            "href": "http://data.example.com/collections/buildings/items.json",
            "rel": "self",
            "type": "application/geo+json",
            "title": "this document"
          },
          {
            "href": "http://data.example.com/collections/buildings/items.html",
            "rel": "alternate",
            "type": "text/html",
            "title": "this document as HTML"
          },
          {
            "href": "http://data.example.com/collections/buildings/items.json&offset=10&limit=2",
            "rel": "next",
            "type": "application/geo+json",
            "title": "next page"
          }
        ],
        "timeStamp": "2018-04-03T14:52:23Z",
        "numberMatched": 123,
        "numberReturned": 2,
        "features": [
          {
            "type": "Feature",
            "id": "123",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                "..."
              ]
            },
            "properties": {
              "function": "residential",
              "floors": "2",
              "lastUpdate": "2015-08-01T12:34:56Z"
            }
          },
          {
            "type": "Feature",
            "id": "132",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                "..."
              ]
            },
            "properties": {
              "function": "public use",
              "floors": "10",
              "lastUpdate": "2013-12-03T10:15:37Z"
            }
          }
        ]
    },
    collections_collectionId_instances: {
        "links": [
          {
            "href": "http://data.example.org/collections/observations",
            "rel": "item",
            "type": "application/geo+json",
            "title": "Observation data"
          },
          {
            "href": "http://example.org/concepts/building.html",
            "rel": "describedBy",
            "type": "text/html",
            "title": "List of available observation types"
          }
        ],
        "id": "2019-08-01T00:00:00Z",
        "title": "2019-08-01T00:00:00Z model run",
        "description": "NOAA Global Forecast surface values from the 2019-08-01T00:00:00Z model run",
        "extent": {
          "x": {
            "label": "Longitude",
            "lowerBound": -180,
            "upperBound": 180,
            "uomLabel": "degrees"
          },
          "y": {
            "label": "Latitude",
            "lowerBound": -90,
            "upperBound": 90,
            "uomLabel": "degrees"
          },
          "z": {
            "label": "Height",
            "lowerBound": 10,
            "upperBound": 100,
            "uomLabel": "m",
            "attributes": {
              "wkt": "...",
              "proj4": "..."
            }
          }
        },
        "parameters": [
          {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        ],
        "outputCRS": [
          {
            "name": "CRS84",
            "wkt": "GEOGCS[\"WGS 84\",DATUM[\"WGS_1984\",SPHEROID[\"WGS 84\",6378137,298.257223563,AUTHORITY[\"EPSG\",\"7030\"]],AUTHORITY[\"EPSG\",\"6326\"]],PRIMEM[\"Greenwich\",0,AUTHORITY[\"EPSG\",\"8901\"]],UNIT[\"degree\",0.01745329251994328,AUTHORITY[\"EPSG\",\"9122\"]],AUTHORITY[\"EPSG\",\"4326\"]]"
          }
        ],
        "outputFormat": [
          "string"
        ]
    },
    collections_collectionId_locations: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instances_instanceId_locations: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    }, 
    collections_collectionId_position: {
      "type" : "Coverage",
      "domain" : {
        "type" : "Domain",
        "domainType" : "PointSeries",
        "axes": {
          "x" : { "values": [-10.1] },
          "y" : { "values": [ -40.2] },
          "t" : { "values": ["2013-01-01","2013-01-02","2013-01-03",
                             "2013-01-04","2013-01-05","2013-01-06"] }
        },
        "referencing": [{
          "coordinates": ["x","y"],
          "system": {
            "type": "GeographicCRS",
            "id": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
          }
        }, {
          "coordinates": ["t"],
          "system": {
            "type": "TemporalRS",
            "calendar": "Gregorian"
          }
        }]
      },
      "parameters" : {
        "PSAL": {
          "type" : "Parameter",
          "description" : {
            "en": "The measured salinity, in practical salinity units (psu) of the sea water "
          },
          "unit" : {
            "symbol" : "psu"
          },
          "observedProperty" : {
            "id" : "http://vocab.nerc.ac.uk/standard_name/sea_water_salinity/",
            "label" : {
              "en": "Sea Water Salinity"
            }
          }
        },
        "POTM": {
          "type" : "Parameter",
          "description" : {
            "en": "The potential temperature, in degrees celcius, of the sea water"
          },
          "unit" : {
            "label": {
              "en": "Degree Celsius"
            },
            "symbol": {
              "value": "Cel",
              "type": "http://www.opengis.net/def/uom/UCUM/"
            }
          },
          "observedProperty" : {
            "id" : "http://vocab.nerc.ac.uk/standard_name/sea_water_potential_temperature/",
            "label" : {
              "en": "Sea Water Potential Temperature"
            }
          }
        }
      },
      "ranges" : {
        "PSAL" : {
          "type" : "NdArray",
          "dataType": "float",
          "axisNames": ["t"],
          "shape": [6],
          "values" : [ 43.9599, 43.9599, 43.9640, 43.9640, 43.9679, 43.9879 ]
        },
        "POTM" : {
          "type" : "NdArray",
          "dataType": "float",
          "axisNames": ["t"],
          "shape": [6],
          "values" : [ 23.8, 23.7, 23.9, 23.4, 23.2, 22.4 ]
        }
      }
    }, 
    collections_collectionId_radius: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_area: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_cube: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_trajectory: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_corridor: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_items_itemId: {
        "type": "Feature",
        "links": [
          {
            "href": "http://data.example.com/id/building/123",
            "rel": "canonical",
            "title": "canonical URI of the building"
          },
          {
            "href": "http://data.example.com/collections/buildings/items/123.json",
            "rel": "self",
            "type": "application/geo+json",
            "title": "this document"
          },
          {
            "href": "http://data.example.com/collections/buildings/items/123.html",
            "rel": "alternate",
            "type": "text/html",
            "title": "this document as HTML"
          },
          {
            "href": "http://data.example.com/collections/buildings",
            "rel": "collection",
            "type": "application/geo+json",
            "title": "the collection document"
          }
        ],
        "id": "123",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            "..."
          ]
        },
        "properties": {
          "function": "residential",
          "floors": "2",
          "lastUpdate": "2015-08-01T12:34:56Z"
        }
    },
    collections_collectionId_locations_locId: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instance_instanceId_position:{
      "type": "Coverage",
      "domain": {
      "type": "Domain",
      "domainType": "PointSeries",
      "axes": {
      "x": {
      "values": [
      -49.199
      ]
      },
      "y": {
      "values": [
      -10.288
      ]
      },
      "t": {
      "values": [
      "2022-02-03T09:00:00Z",
      "2022-02-03T12:00:00Z",
      "2022-02-03T15:00:00Z",
      "2022-02-03T18:00:00Z",
      "2022-02-03T21:00:00Z"
      ]
      }
      },
      "referencing": [
      {
      "coordinates": [
      "y",
      "x"
      ],
      "system": {
      "type": "GeographicCRS",
      "id": "http://www.opengis.net/def/crs/EPSG/0/4326"
      }
      },
      {
      "coordinates": [
      "t"
      ],
      "system": {
      "type": "TemporalCRS",
      "calendar": "Gregorian"
      }
      }
      ]
      },
      "parameters": {
      "Convective_precipitation_surface_Mixed_intervals_Accumulation": {
      "type": "Parameter",
      "description": {
      "en": "Convective_precipitation_surface_Mixed_intervals_Accumulation"
      },
      "unit": {
      "label": {
      "en": "kg.m-2"
      },
      "symbol": {
      "value": "kg.m-2",
      "type": "http://labs.metoffice.gov.uk/kg.m-2"
      }
      },
      "observedProperty": {
      "id": "http://codes.wmo.int/grib2/codeflag/4.2/_0-1-10",
      "label": {
      "en": "Convective precipitation (Mixed_intervals Accumulation) @ Ground or water surface"
      }
      }
      }
      },
      "ranges": {
      "Convective_precipitation_surface_Mixed_intervals_Accumulation": {
      "type": "NdArray",
      "dataType": "float",
      "axisNames": [
      "t",
      "y",
      "x"
      ],
      "shape": [
      5,
      1,
      1
      ],
      "values": [
      0,
      0,
      0.5625,
      0.8125,
      0.3125
      ]
      }
      }
      }, 
    collections_collectionId_instance_instanceId_radius:{
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instance_instanceId_area: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instance_instanceId_cube: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    }, 
    collections_collectionId_instance_instanceId_trajectory: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instance_instanceId_corridor: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    collections_collectionId_instance_instanceId_locations_locId: {
        "domain": {
          "type": "Domain",
          "domainType": "Grid",
          "axes": {
            "x": {
              "values": [
                -10,
                -5,
                0
              ]
            },
            "y": {
              "values": [
                40,
                50
              ]
            },
            "z": {
              "values": [
                5
              ]
            },
            "t": {
              "values": [
                "2010-01-01T00:12:20Z"
              ]
            }
          }
        },
        "parameters": {
          "additionalProp1": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp2": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          },
          "additionalProp3": {
            "type": "Parameter",
            "id": "sea_ice",
            "description": {
              "en": "Sea Ice concentration (ice=1;no ice=0)"
            },
            "unit": {
              "label": {
                "en": "Ratio"
              },
              "symbol": {
                "value": "1",
                "type": "http://www.opengis.net/def/uom/UCUM/"
              }
            },
            "observedProperty": {
              "id": "http://vocab.nerc.ac.uk/standard_name/sea_ice_area_fraction/",
              "label": {
                "en": "Sea Ice Concentration"
              }
            }
          }
        },
        "ranges": {
          "additionalProp1": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp2": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          },
          "additionalProp3": {
            "type": "NdArray",
            "dataType": "float",
            "axisNames": [
              "t",
              "z",
              "y",
              "x"
            ],
            "shape": [
              1,
              1,
              2,
              3
            ],
            "values": [
              0.5,
              0.6,
              0.4,
              0.6,
              0.2,
              null
            ]
          }
        }
    },
    coverage: {
          "type" : "Coverage",
          "domain" : {
            "type" : "Domain",
            "domainType" : "Grid",
            "axes": {
              "x" : { "start": 7, "stop": 14, "num": 4 },
              "y" : { "start": 54, "stop": 48, "num": 4 }
            },
            "referencing": [{
              "coordinates": ["x","y"],
              "system": {
                "type": "GeographicCRS",
                "id": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
              }
            }]
          },
          "parameters" : {
            "temperature": {
              "type" : "Parameter",
              "description": {
                "en": "Air temperature measured in degrees Celsius."
              },
              "unit" : {
                "label": {
                  "en": "Degree Celsius"
                },
                "symbol": {
                  "value": "Cel",
                  "type": "http://www.opengis.net/def/uom/UCUM/"
                }
              },
              "observedProperty" : {
                "id": "http://vocab.nerc.ac.uk/standard_name/air_temperature/",
                "label" : {
                  "en": "Air temperature",
                  "de": "Lufttemperatur"
                },
                "description": {
                  "en": "Air temperature is the bulk temperature of the air, not the surface (skin) temperature."
                }
              }
            }
          },
          "ranges" : {
            "temperature" : {
              "type" : "NdArray",
              "dataType": "float",
              "axisNames": ["y", "x"],
              "shape": [4, 4],
              "values" : [
                17.3, 18.2, 16.5, 18.7,
                18.1, 19.4, 17.2, 18.6,
                19.2, 20.4, 21.1, 20.7,
                21.1, 21.3, 20.5, 19.2
              ]
            }
          }
        }
};

export default responses;