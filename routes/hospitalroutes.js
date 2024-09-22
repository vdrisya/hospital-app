const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const filepath = path.join(__dirname, '../hospitals.json');


const readData = () => {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
};


const writeData = (data) => {
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2)); }




router.get('/', (req, res) => {
    const hospitals = readData();
    res.json(hospitals);
});


router.post('/add', (req, res) => {
    const hospitals = readData();
    const newHospital = req.body;
    newHospital.id = hospitals.length ? hospitals[hospitals.length - 1].id + 1 : 1; 
    hospitals.push(newHospital);
    writeData(hospitals);
    res.status(201).json(newHospital);
});

router.put('/:id', (req, res) => {
    const hospitals = readData();
    const id = parseInt(req.params.id);
    const updatedHospital = req.body;

    const index = hospitals.findIndex(hospital => hospital.id === id);
    if (index !== -1) {
        hospitals[index] = { ...hospitals[index], ...updatedHospital };
        writeData(hospitals);
        res.json(hospitals[index]);
    } else {
        res.status(404).json({ message: 'Hospital not found' });
    }
});


router.delete('/:id', (req, res) => {
    const hospitals = readData();
    const id = parseInt(req.params.id); 

    
    const hospitalIndex = hospitals.findIndex(hospital => hospital.id === id);
    if (hospitalIndex === -1) {
        
        return res.status(404).json({ message: 'Hospital not found' });
    }

    
    hospitals.splice(hospitalIndex, 1); 

    
    writeData(hospitals);

  
    res.json({ message: 'Hospital deleted successfully' });
});

module.exports = router;
