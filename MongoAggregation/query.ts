 [
    {
      '$project': {
        '_id': 0, 
        'restaurant_id': 1, 
        'name': 1, 
        'borough': 1, 
        'cuisine': 1
      }
    }, {
      '$match': {
        'name': new RegExp('.*Reg.*')
      }
    },
        
    
    {
          '$match': {
            'borough': 'Bronx', 
            '$or': [
              {
                'cuisine': 'American '
              }, {
                'cuisine': 'Chinese'
              }
            ]
          }
        },

// query 3
  {
    '$project': {
      'restaurant_id': 1, 
      'name': 1, 
      'borough': 1, 
      'cuisine': 1
    }
  }, {
    '$match': {
      'borough': {
        '$in': [
          'Staten Island', 'Queens', 'Bronx', 'Brooklyn'
        ]
      }
    }
  },

//   query 4
{
    '$project': {
      'restaurant_id': 1, 
      'name': 1, 
      'borough': 1, 
      'cuisine': 1
    }
  }, {
    '$match': {
      'borough': {
        '$nin': [
          'Staten Island', 'Queens', 'Bronx', 'Brooklyn'
        ]
      }
    }
  },
//   query5

{
    '$project': {
      'restaurant_id': 1, 
      'name': 1, 
      'borough': 1, 
      'cuisine': 1
    }
  }, {
    '$match': {
      'grades.score': {
        '$not': {
          '$gt': 10
        }
      }
    }
  },

//   query 6


    {
      '$project': {
        'restaurant_id': 1, 
        'name': 1, 
        'borough': 1, 
        'cuisine': 1
      }
    }, {
      '$match': {
        '$or': [
          {
            'name': new RegExp('^Wil')
          }, {
            '$and': [
              {
                'cuisine': {
                  '$ne': 'American '
                }
              }, {
                'cuisine': {
                  '$ne': 'Chinees'
                }
              }
            ]
          }
        ]
      }
    },

// query 7

    {
      '$project': {
        'restaurant_id': 1, 
        'name': 1, 
        'grades': 1
      }
    }, {
      '$match': {
        'grades.date': new Date('Mon, 11 Aug 2014 00:00:00 GMT'), 
        'grades.grade': 'A', 
        'grades.score': 11
      }
    },
  
// query 8

    {
      '$project': {
        'restaurant_id': 1, 
        'name': 1, 
        'grades': 1
      }
    }, {
      '$match': {
        'grades.1.date': new Date('Mon, 11 Aug 2014 00:00:00 GMT'), 
        'grades.1.grade': 'A', 
        'grades.1.score': 9
      }
    },

// query 9
{
    '$project': {
      'restaurant_id': 1, 
      'name': 1, 
      'address': 1, 
      'coord': 1
    }
  }, {
    '$match': {
      'address.coord.1': {
        '$gt': 42, 
        '$lte': 52
      }
    }
  },

//   query 10


    {
        '$sort': {
            'name': -1
        }
    },

// query 11

{
    '$sort': {
        'cuisine': 1, 
        'borough': -1
    }
},

// query 12

{
    '$match': {
        'address.street': {
            '$exists': true
        }
    }
}


  

      


  ]