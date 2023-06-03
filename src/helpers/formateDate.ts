export const formatDate = (date:string) => {
   const currentDate = new Date (date)
   const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
   const day = currentDate.getDate();
   const month = currentDate.getMonth();
   const year = currentDate.getFullYear();

   return `${day} de ${months[month]} de ${year}`
}