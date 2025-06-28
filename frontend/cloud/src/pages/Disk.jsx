import React, { useState, useEffect } from 'react'

export default function Disk() {
  // 1) Тестовые файлы
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'Документ.pdf',
      size: 102400,
      createdAt: Date.now() - 86400000,
      url: '#'
    },
    {
      id: 2,
      name: 'Фото.jpg',
      size: 204800,
      createdAt: Date.now() - 3600000,
      url: '#'
    }
  ])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    // Когда появится API, раскомментируйте эти строки:
    /*
    fetchFiles()
    */
  }, [])

  /* Реальный запрос:
  const fetchFiles = async () => {
    try {
      const { data } = await axios.get('/api/files')
      const list = Array.isArray(data.files) ? data.files : []
      setFiles(list)
    } catch {
      setFiles([])
    }
  }
  */

  const handleUpload = e => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    // Здесь вы можете вставить логику загрузки через axios…
    setTimeout(() => {
      // эмулируем успешную загрузку
      setFiles([
        {
          id: Date.now(),
          name: file.name,
          size: file.size,
          createdAt: Date.now(),
          url: '#'
        },
        ...files
      ])
      setUploading(false)
      e.target.value = null
    }, 1000)
  }

  const handleDelete = id => {
    if (!window.confirm('Удалить файл?')) return
    setFiles(files.filter(f => f.id !== id))
  }

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h1>Моё хранилище</h1>

      {/* Загрузка */}
      <div style={{ margin: '20px 0' }}>
        <input
          type="file"
          onChange={handleUpload}
          disabled={uploading}
        />
        {uploading && <span style={{ marginLeft: 10 }}>Загрузка…</span>}
      </div>

      {/* Список файлов */}
      {files.length === 0 ? (
        <p>Файлы не найдены.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {files.map(file => (
            <li
              key={file.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 12,
                padding: 8,
                border: '1px solid #ddd',
                borderRadius: 4
              }}
            >
              <a
                href={file.url}
                download={file.name}
                style={{ flexGrow: 1 }}
              >
                {file.name}
              </a>
              <span style={{ margin: '0 10px', color: '#666' }}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
              <span style={{ marginRight: 10, color: '#666' }}>
                {new Date(file.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(file.id)}
                style={{
                  background: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  borderRadius: 4
                }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
