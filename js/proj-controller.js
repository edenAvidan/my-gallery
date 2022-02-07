'use strict'

$(initPage);
$(addEventListeners);

function initPage() {
    renderProjs();
}

function addEventListeners() {
    $('.portfolio-item').click(onProjClick);
    $('.offcanvas-btn').click(toggleCanvesState);
    $('.contact').click(() => {
        toggleCanvesState();
        return false;
    });
    $('.offcanvas-aside button').click(onContactSubmit);
}

function renderProjs() {
    const projs = getProjs();

    const strHtml = projs.map(proj => {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item" data-proj-id="${proj.id}">
            <a class="portfolio-link" data-toggle="modal" href="#portfolioModal">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="img/portfolio/${proj.id}-t.png" alt="">
            </a>
            <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            </div>
        </div>
    `});

    $('.proj-list').html(strHtml);
}

function onProjClick() {
    const projId = $(this).data('proj-id');
    const proj = getProjById(projId);
    const $elProjDetails = $('.proj-details');
    const projLabels = proj.labels.map(label => `<span class="badge bg-secondary p-2 mx-2">${label}</span>`);

    $elProjDetails.find('h2').text(proj.name);
    $elProjDetails.find('.labels').html(projLabels)
    $elProjDetails.find('.item-intro').text(proj.title);
    $elProjDetails.find('img').attr('src', `img/portfolio/${proj.id}.png`);
    $elProjDetails.find('.proj-desc').text(proj.desc);
    $elProjDetails.find('.publish-date').text(proj.publishedAt);
    $elProjDetails.find('.go-to-proj').attr('href', `projs/${proj.name}/index.html`);
}

function onContactSubmit() {
    const userEmail = $('.offcanvas-aside input[type=email]').val();
    const userSubject = $('.offcanvas-aside input[type=text]').val();
    const userMessage = $('textarea').val().replace(/\n/g, '%0D%0A');

    if (!userEmail || !userSubject || !userMessage) return;

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=edenaavidan@gmail.com \
                &su=${userSubject}&body=${userMessage}%0D%0A%0D%0A${userEmail}`;

    window.open(url);
    toggleCanvesState(); // closing canves after sending link
}
