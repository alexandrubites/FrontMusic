import '../reactions.css';
import KafkaService from "../services/kafka.service";
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ReactionsComponent = ({ id }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [loveCount, setLoveCount] = useState(0);
  const [hahaCount, setHahaCount] = useState(0);
  const [angryCount, setAngryCount] = useState(0);
  const [sadCount, setSadCount] = useState(0);
  const [wowCount, setWowCount] = useState(0);
  const uri = "https://api-service-alexandrubites.cloud.okteto.net/api/reactions";

  const fetchReactions = useCallback(async () => {
    try {
      const responseLike = await axios.get(`${uri}/${id}/like`);
      const fetchedLikeCount = responseLike.data ? responseLike.data.n : 0;
      const responseLove = await axios.get(`${uri}/${id}/love`);
      const fetchedLoveCount = responseLove.data ? responseLove.data.n : 0;
      const responseAngry = await axios.get(`${uri}/${id}/angry`);
      const fetchedAngryCount = responseAngry.data ? responseAngry.data.n : 0;
      const responseWow = await axios.get(`${uri}/${id}/wow`);
      const fetchedWowCount = responseWow.data ? responseWow.data.n : 0;
      const responseHaha = await axios.get(`${uri}/${id}/haha`);
      const fetchedHahaCount = responseHaha.data ? responseHaha.data.n : 0;
      const responseSad = await axios.get(`${uri}/${id}/sad`);
      const fetchedSadCount = responseSad.data ? responseSad.data.n : 0;

      setLikeCount(fetchedLikeCount);
      setLoveCount(fetchedLoveCount);
      setAngryCount(fetchedAngryCount);
      setWowCount(fetchedWowCount);
      setHahaCount(fetchedHahaCount);
      setSadCount(fetchedSadCount);

      console.log(likeCount)

    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('El recurso no fue encontrado.');
      } else {
        console.log('Error al obtener las reacciones:', error);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchReactions();
  }, [fetchReactions]);

  const reaction = async (e, status) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const data = {
      userId: user,
      objectId: id,
      reactionId: status
    };
    console.log(JSON.stringify(data));
    KafkaService.reactionPush(data);
    await fetchReactions();
  };

  return (
    <div className="reactions">
      <div className="reaction reaction-like" onClick={(e) => reaction(e, "like")}>
        {likeCount}
      </div>

      <div className="reaction reaction-love" onClick={(e) => reaction(e, "love")}>
        {loveCount}
      </div>

      <div className="reaction reaction-haha" onClick={(e) => reaction(e, "haha")}>
        {hahaCount}
      </div>

      <div className="reaction reaction-wow" onClick={(e) => reaction(e, "wow")}>
        {wowCount}
      </div>

      <div className="reaction reaction-sad" onClick={(e) => reaction(e, "sad")}>
        {sadCount}
      </div>

      <div className="reaction reaction-angry" onClick={(e) => reaction(e, "angry")}>
        {angryCount}
      </div>
    </div>
  );
};

export default ReactionsComponent;
