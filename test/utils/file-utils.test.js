import { extractExtension, isCompressedFile } from '../../src/utils/file-utils'

describe('When call extractExtension() with a valid filename', () => {
  it('should return an extension', () => {
    expect(extractExtension('test.jpg')).toBe('jpg')
  });
});

describe('When call extractExtension() with a filename (edge case)', () => {
  it('should return an extension from a multi dot filename', () => {
    expect(extractExtension('test.test.jpg')).toBe('jpg')
  });

  it('should return an extension from a spaced filename', () => {
    expect(extractExtension(' test 9 oct sem 6.docx')).toBe('docx')
  });

  it('should return an extension from a doted filename', () => {
    expect(extractExtension('.DS_store')).toBe('DS_store')
  });
});

describe('When call isCompressedFile() with a supported compressed file extension', () => {
  it('should return true', () => {
    expect(isCompressedFile('test.zip')).toBe(true)
  });

  it('should return false', () => {
    expect(isCompressedFile('.JeJei_dje')).toBe(false)
  });
});
