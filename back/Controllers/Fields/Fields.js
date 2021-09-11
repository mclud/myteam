const Field = require('../../models/Fields');

const normalizeFieldId = async (name) => {
    let fields = await Field.find(function(res, fields) {
    return fields;
    });
    if (fields.length > 0) {
        return await Promise.resolve(parseInt(fields[fields.length -1].fieldId) + 1);
    } else {
        return 1;
    }
}

exports.createField = async (req, res) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
  if (req.body !== undefined) {      
      //Normalize ID
      const normalizedId = await normalizeFieldId(req.body.name).then(id => id);

      if (normalizedId !== null) {
        let fieldToBe = new Field({
          fieldName : req.body.name,
          fieldCoordX : req.body.coordx,
          fieldCoordY : req.body.coordy,
          fieldAdr : req.body.adr,
          fieldId : normalizedId,
          sportsAvailable : "basket",
          fieldCreatedAt : new Date(),
        });    
        
        console.log(fieldToBe)
  
        fieldToBe.save((err) => {
          if (err) {
            console.log(err);
            res.status(400);
            res.json({"msg": "Merci de revérifier vos informations.."});
          } else {
            res.json({"msg": "Field added"});
          }
        });
      } else {
        res.json({'error':'Field already exist'});
      }
  }
}

exports.getFields = async (req, res) => {
  res.set('Access-Control-Allow-Origin', req.headers.origin);
    let fields = await Field.find((res, fields) => {
        return fields;
    });
    if (fields.length > 0) {
        res.json(fields);
    } else res.json({error : "no fields"});
}