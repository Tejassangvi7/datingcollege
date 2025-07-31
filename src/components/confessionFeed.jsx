import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Confession from "./confession";

const ConfessionsFeed = () => {
  const [confessions, setConfessions] = useState([]); // All confessions loaded so far
  const [page, setPage] = useState(1);                // Current page number
  const [hasMore, setHasMore] = useState(true);       // If more pages exist
  const [loading, setLoading] = useState(false);      // Loading state
  const [error, setError] = useState(null);           // Error state

  const observer = useRef(); // Store IntersectionObserver instance

  // 👇 Function to load confessions
  const fetchConfessions = async () => {
    try {
      setLoading(true); // Show "loading" indicator
      const response = await axios.get(`/api/confessions?page=${page}`);
      const newConfessions = response.data;

      // If no new data, stop further loading
      if (newConfessions.length === 0) {
        setHasMore(false);
      } else {
        // Add new confessions to existing list
        setConfessions((prev) => [...prev, ...newConfessions]);
      }
    } catch (err) {
      console.error("Error fetching confessions:", err);
      setError("Failed to load confessions.");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Load new data when page changes
  useEffect(() => {
    fetchConfessions();
  }, [page]);

  // 👇 Infinite scroll logic
  const lastConfessionRef = useCallback(
    (node) => {
      if (loading) return; // Don't trigger if already loading
      if (observer.current) observer.current.disconnect(); // Clean up old observer

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Next page
        }
      });

      if (node) observer.current.observe(node); // Start observing last confession
    },
    [loading, hasMore]
  );

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-6 text-center">
        🌐 MY Confessions
      </h1>

      {confessions.map((confession, index) => {
        if (index === confessions.length - 1) {
          // 👇 Attach ref to the last confession for infinite scroll
          return (
            <div ref={lastConfessionRef} key={confession._id}>
              <Confession confession={confession} />
            </div>
          );
        } else {
          return <Confession key={confession._id} confession={confession} />;
        }
      })}

      {loading && (
        <p className="text-center text-gray-400 mt-4">Loading more confessions...</p>
      )}
      {error && (
        <p className="text-center text-red-500 mt-4">{error}</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-500 mt-4">
          🎉 You’ve reached the end of the feed.
        </p>
      )}
    </div>
  );
};

export default ConfessionsFeed;
