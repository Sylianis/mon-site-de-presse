// Charger les données JSON et initialiser la page
fetch('articles.json')
    .then(response => response.json())
    .then(data => {
        const weekSelector = document.getElementById('week-selector');
        const titlesContainer = document.getElementById('titles-container');

        // Ajouter les semaines au menu déroulant
        data.forEach(weekData => {
            const option = document.createElement('option');
            option.value = weekData.week;
            option.textContent = weekData.week;
            weekSelector.appendChild(option);
        });

        // Charger les articles de la semaine sélectionnée
        weekSelector.addEventListener('change', (e) => {
            const selectedWeek = e.target.value;
            const weekData = data.find(week => week.week === selectedWeek);

            // Réinitialiser les conteneurs
            titlesContainer.innerHTML = '';

            // Afficher les titres et conteneurs pour les articles
            if (weekData) {
                weekData.articles.forEach(article => {
                    // Créer l'élément titre
                    const listItem = document.createElement('li');
                    listItem.textContent = article.title;
                    listItem.dataset.id = article.id;
                    listItem.style.cursor = 'pointer';

                    // Créer le conteneur pour l'article
                    const articleDiv = document.createElement('div');
                    articleDiv.classList.add('article-content', 'hidden');

                    // Ajouter le contenu de l'article
                    articleDiv.innerHTML = `
                        <p><em>Publié le ${article.date}</em></p>
                        <p>${article.content}</p>
                    `;

                    // Ajouter l'événement de clic pour afficher/masquer l'article
                    listItem.addEventListener('click', () => {
                        if (articleDiv.classList.contains('active')) {
                            articleDiv.classList.remove('active');
                            articleDiv.classList.add('hidden');
                            setTimeout(() => (articleDiv.style.display = 'none'), 300);
                        } else {
                            articleDiv.classList.remove('hidden');
                            articleDiv.style.display = 'block';
                            setTimeout(() => articleDiv.classList.add('active'), 10);
                        }
                    });

                    // Ajouter le titre et l'article au conteneur
                    titlesContainer.appendChild(listItem);
                    titlesContainer.appendChild(articleDiv);
                });
            }
        });

        // Charger automatiquement la première semaine au démarrage
        if (data.length > 0) {
            weekSelector.value = data[0].week;
            weekSelector.dispatchEvent(new Event('change'));
        }
    })
    .catch(error => {
        console.error('Erreur lors du chargement des données JSON :', error);
    });
