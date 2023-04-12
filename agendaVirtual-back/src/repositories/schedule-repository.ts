import prisma from "../database/prisma-connection";

async function listSchedule() {
  return prisma.schedule.findMany({
    where: {
      finished: false
    }
  });
}

async function listScheduleByDate(date: string) {
  return prisma.schedule.findMany({
    where: {
      date: date,
      finished: false
    },
    include: {
      Service: true
    }
  });
}

async function listScheduleByClient(clientId: number) {
  return prisma.schedule.findMany({
    where: {
      clientId,
      finished: false
    },
    include: {
      Service: true
    }
  });
}

async function getOpenClientSchedule(clientId: number) {
  return prisma.schedule.findFirst({
    where: {
      clientId,
      finished: false
    }
  });
}

async function verifyClientSchedule(clientId: number, scheduleId: number) {
  return prisma.schedule.findFirst({
    where: {
      id: scheduleId,
      clientId,
      finished: false
    }
  });
}

async function getScheduleById(id: number) {
  return prisma.schedule.findFirst({
    where: {
      id
    }
  });
}

async function insertSchedule(name: string, clientId: number, service_id: number, date: string, hour: number) {
  return prisma.schedule.create({
    data: {
      clientName: name,
      clientId,
      date,
      hour,
      service_id
    }
  });
}

async function updateSchedule(id:number, name: string, service_id: number, date: string, hour: number) {
  return prisma.schedule.update({
    where: {
      id
    },
    data: {
      clientName: name,
      date,
      hour,
      service_id
    }
  });
}

async function finishSchedule(id:number) {
  return prisma.schedule.update({
    where: {
      id
    },
    data: {
      finished: true
    }
  });
}

async function deleteScheduleById(id: number) {
  return prisma.schedule.delete({
    where: {
      id
    }
  });
}

const scheduleRepository = {
  getScheduleById,
  getOpenClientSchedule,
  listSchedule,
  listScheduleByDate,
  listScheduleByClient,
  verifyClientSchedule,
  insertSchedule,
  updateSchedule,
  deleteScheduleById,
  finishSchedule
}

export default scheduleRepository;
