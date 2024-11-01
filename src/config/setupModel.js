const { getSeqInstance } = require('./setupDb');
const { Students } = require('../model/studentsModels'); 

const setupModel = async () => {
    const instanceDb = await getSeqInstance();
    const students = Students.init(instanceDb); 
    
};

setupModel();
