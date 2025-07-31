import React, { useEffect, useState, useRef, useCallback } from "react";
import api from "../../api/api"; // Adjust path if needed
import { FaQuoteLeft } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
const ConfessionsFeedall = () => {
  const [confessions, setConfessions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const observer = useRef();

  // 👇 Function to fetch confessions
  const fetchConfessions = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/v1/confessions/getAllConfessions?page=${page}&limit=10`);

      const newConfessions = response.data || []; // Adjust if your response is nested
      console.log("API Response:", response.data);

      if (newConfessions.length === 0) {
        setHasMore(false);
      } else {
        setConfessions((prev) => [...prev, ...newConfessions]);
      }
    } catch (err) {
      console.error("Error fetching confessions:", err);
      setError("Failed to load confessions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfessions();
  }, [page]);

  const lastConfessionRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-500 mb-8 text-center">
        Anonymous Confessions
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {confessions.map((confession, index) => {
          if (index === confessions.length - 1) {
            return (
              <div ref={lastConfessionRef} key={confession._id}>
                <ConfessionCard confession={confession} />
              </div>
            );
          } else {
            return (
              <ConfessionCard key={confession._id} confession={confession} />
            );
          }
        })}
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading more confessions...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-4">{error}</p>
      )}
      {!hasMore && !loading && (
        <p className="text-center text-gray-500 mt-4">
          🎉 You’ve reached the end of the feed.
        </p>
      )}
      {!loading && confessions.length === 0 && (
        <p className="text-center text-gray-400 mt-4">No confessions yet.</p>
      )}
    </div>
  );
};

// 👇 Basic ConfessionCard component inside same file
const ConfessionCard = ({ confession }) => {
  const timeAgo = confession.createdAt
    ? formatDistanceToNow(new Date(confession.createdAt), { addSuffix: true })
    : "";

  return (
    <div className="bg-white/5 dark:bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/20 transition-transform transform hover:scale-[1.02] hover:shadow-purple-500/30 text-white">
      <div className="flex items-start gap-3">
        <FaQuoteLeft className="text-purple-400 text-xl mt-1" />
        <p className="text-base sm:text-lg whitespace-pre-wrap leading-relaxed font-light">
          {confession.content || "No confession provided."}
        </p>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>— Anonymous</span>
        {timeAgo && <span>{timeAgo}</span>}
      </div>
    </div>
  );
};

export default ConfessionsFeedall;
