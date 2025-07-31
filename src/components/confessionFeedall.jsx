import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import api from "../api/api";
import Confession from "./confession";

const ConfessionsFeedall = () => {
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
      const response = await api.get(`/api/v1/confessions/getAllConfessions?page=${page}&limit=10`);
      const newConfessions = response.data || [];
      console.log("API Response:", response.data);

      
     
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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-purple-500 mb-8 text-center">
        
      </h1>

      {/* 🔥 Responsive grid for 3 per row */}
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">


        {confessions.map((confession, index) => {
          if (index === confessions.length - 1) {
            // 👇 Attach ref to the last confession for infinite scroll
            return (
              <div ref={lastConfessionRef} key={confession._id}>
                <Confession confession={confession} />
              </div>
            );
          } else {
            return <Confession key={confession._id} confession={confession}  index={index}  />;
          }
        })}
      </div>

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

export default ConfessionsFeedall;
