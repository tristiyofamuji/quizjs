import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"

const SoalList = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fungsi untuk mengambil data soal dari API
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("/api/questions");
                setQuestions(response.data);
                setLoading(false);
            } catch (err) {
                setError("Gagal mengambil data soal");
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);  // Empty array berarti hanya berjalan sekali setelah komponen pertama kali dirender

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="soal-list">
            <h1>Daftar Soal</h1>
            {questions.length === 0 ? (
                <p>Tidak ada soal tersedia.</p>
            ) : (
                questions.map((question) => (
                    <div key={question.uuid} className="soal-item">
                        <h2>{question.question}</h2>
                        <ul>
                            {question.answers.map((answer) => (
                                <li key={answer.uuid}>{answer.answer_text}</li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
};

export default SoalList;
