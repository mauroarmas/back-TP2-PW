const { Students } = require("../model/studentsModels"); // Cambiado a Students
const { Op } = require("sequelize");

const findAll = async (search, currentPage, pageSize) => {
  try {
    
    const page = Number(currentPage) || 1; // Asignar 1 si no se proporciona
    const size = Number(pageSize) || 10; // Asignar 10 si no se proporciona

    // Calcular el desplazamiento
    const offset = (page - 1) * size;

    return await Students.findAndCountAll({
      where: {
        [Op.or]: [
          { firstname: { [Op.substring]: search } },
          { lastname: { [Op.substring]: search } },
        ],
        deleted: 0,
      },
      limit: size, // Usar el tamaño de página aquí
      offset, // Usar el desplazamiento aquí
    });
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

const findByLastname = async (lastname) => {
  try {
    return await Students.findAll({
      where: {
        lastname,
        deleted: 0,
      },
    });
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

const findById = async (id) => {
  try {
    const student = await Students.findOne({ where: { id, deleted: 0 } }); 
    return student;
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

const create = async (student) => {
  try {

    const emailStudentExist = await Students.findOne({
      where: {
        [Op.and]: [{ deleted: 0 }, { email: student.email }],
      },
    });

    const dniStudentExist = await Students.findOne({
      where: {
        [Op.and]: [{ deleted: 0 }, { dni: student.dni }],
      },
    });

    if (emailStudentExist && dniStudentExist) {
      throw new Error(
        "Ya existe un estudiante con el email y el DNI ingresado"
      );
    } else if (emailStudentExist) {
      throw new Error("El email ingresado ya existe");
    } else if (dniStudentExist) {
      throw new Error("El DNI ingresado ya existe");
    }

    // Obtener el último sid y sumarle 1
    const lastStudent = await Students.findOne({
      order: [["sid", "DESC"]],
      
    });

    const sid = lastStudent ? lastStudent.sid + 1 : 1; 
    const newStudent = await Students.create({ ...student, sid });

    return newStudent;
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

const updateById = async (id, payload) => {
  try {

    const [updated] = await Students.update(payload, {
      where: { id, deleted: 0 }, 
    });

    if (!updated) {
      throw new Error("No se encontró el estudiante para actualizar.");
    }
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};
const logicDeleteById = async (id, payload) => {
  payload.deleted = 1;
  try {
    
    const [updated] = await Students.update(payload, {
      where: { id, deleted: 0 }, 
    });

    if (!updated) {
      throw new Error("No se encontró el estudiante para actualizar.");
    }
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const [deleted] = await Students.update(
      { deleted: 1 },
      {
        
        where: { id },
      }
    );

    if (!deleted) {
      throw new Error("No se encontró el estudiante para eliminar.");
    }
  } catch (error) {
    console.error("studentsServices: " + error);
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  findByLastname,
  logicDeleteById,
};
