const { prisma } = require("../prisma/prisma-client");

const getAll = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: "не удалось получить сотрудников" });
  }
};

const add = async (req, res) => {
  const data = req.body;
  try {
    if (!data.firstName || !data.lastName || !data.age || !data.address) {
      return res.status(400).json({ message: "Все поля обязательны" });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json("что то пошло не так");
  }
};

const getUniq = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: "не удалось получить сотрудника" });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    res.sendStatus(204).sendText;
  } catch (err) {
    res.status(500).json({ message: "не удалось удалить сотрудника" });
  }
};

const edit = async (req, res) => {
  const data = req.body;
  const { id } = req.params;

  try {
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: "не удалось редактировать сотрудника" });
  }
};
module.exports = {
  getAll,
  getUniq,
  add,
  remove,
  edit,
};
