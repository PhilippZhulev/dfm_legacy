import Report from './logic';
import { res } from './model.mock';

it('Проверка состояния до заполнения', () => {
  const report = new Report();
  expect(report.GetDefaultReportData()).toBe(null);
});

it('Проверка состояния после заполнения', () => {
  const report = new Report();
  report.FillReportData('test');
  expect(report.GetDefaultReportData()).toBe('test');
});

it('Проверка состояния после заполнения проверка заполнение данными модели', () => {
  const report = new Report();
  report.FillReportData(res.data.model);
  const result = report.GetDefaultReportData();
  expect(result.value).toBe('fil_123456');
});

it('Генерация исходных данных', () => {
  const report = new Report();
  report.FillReportData(res.data.model);
  const result = report.SetReportData('samo', 0);
  expect(result.resource[0]).toBe('Самоинкассация');
  expect(result.resource[1]).toBe('113.9 млн');
  expect(result.resource[2]).toBe('2019');
  expect(result.children[0][0]).toBe('VM x86 VmWare Linux (RAM)');
  expect(result.children[0][1]).toBe('Гбайт');
  expect(result.children[0][2]).toBe('407.076');
  expect(result.children[0][3]).toBe('208.4 тыс.');
  expect(result.children.length).toBe(7);
});

it('Генерация исходных данных для csv', () => {
  const report = new Report();
  report.FillReportData(res.data.model);
  const data = report.SetReportData('samo', 0);
  const result = report.CreateReportCsv(data);
  expect(result).toMatch('Период');
  expect(result).toMatch('Узел потребляет ресурсы');
  expect(result).toMatch('Единица измерения');
  expect(result).toMatch('Кол-во потребляемого ресурса');
  expect(result).toMatch('VM x86 VmWare Linux (RAM)');
});

it('Генерация url', () => {
  const report = new Report();
  report.FillReportData(res.data.model);
  const data = report.SetReportData('samo', 0);
  const result = report.CreateReportCsv(data);
  const downloadData = report.GenerateUrl(result);
  expect(downloadData.url).toMatch('data:text/csv;charset=utf-8');
  expect(downloadData.target).toBe('_blank');
  expect(downloadData.download).toMatch('.csv');
});
