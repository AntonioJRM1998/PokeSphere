module.exports = {
  preset: "jest-preset-angular",
  testMatch: ["**/+(*.)+(spec).+(ts)"], // Busca los archivos de prueba
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"], // Configuración de Jest
  collectCoverage: true, // Habilita la cobertura
  coverageDirectory: "coverage", // Carpeta donde se guardará el reporte
  coverageReporters: ["html", "text-summary", "lcov", "text"], // Formatos de reporte
  collectCoverageFrom: [
    "src/app/**/*.ts", // Archivos a incluir
    "!src/main.ts", // Excluir archivos principales
    "!src/environments/**", // Excluir entornos
  ],
};
