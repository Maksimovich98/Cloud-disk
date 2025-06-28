// src/pages/MyFiles.jsx
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'

const storage = getStorage()

export default function MyFiles() {
  const user = useContext(AuthContext)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const bucketRef = ref(storage, `user_files/${user.uid}`)

  // Загрузка списка файлов
  const fetchFiles = async () => {
    const res = await listAll(bucketRef)
    const items = await Promise.all(
      res.items.map(async itemRef => {
        const url = await getDownloadURL(itemRef)
        return { name: itemRef.name, url, ref: itemRef }
      })
    )
    setFiles(items)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  // Обработчик загрузки
  const handleUpload = async e => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const fileRef = ref(bucketRef, file.name)
      await uploadBytes(fileRef, file)
      await fetchFiles()
    } catch (err) {
      console.error(err)
      setError('Ошибка при загрузке файла')
    } finally {
      setUploading(false)
    }
  }

  // Удаление
  const handleDelete = async item => {
    try {
      await deleteObject(item.ref)
      await fetchFiles()
    } catch (err) {
      console.error(err)
      setError('Не удалось удалить файл')
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>Мои файлы</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: 20 }}>
        <label style={{ cursor: 'pointer' }}>
          {uploading ? 'Загрузка...' : 'Добавить файл'}
          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      <ul>
        {files.map(item => (
          <li key={item.name} style={{ marginBottom: 10 }}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.name}
            </a>{' '}
            <button onClick={() => handleDelete(item)} style={{ marginLeft: 10 }}>
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
