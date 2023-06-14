
import React from 'react';

function ListActions() {
    return (
        <div className="no-back">
            <div className="pop-over-header js-pop-over-header">
                <span className="pop-over-header-title">List actions</span>
                <a href="#" className="pop-over-header-close-btn icon-sm icon-close"></a>
            </div>
            <div className="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent" style={{ maxHeight: "642px" }}>
                <div>
                    <div>
                        <ul className="pop-over-list">
                            <li><a className="js-add-card" href="#">Add card…</a></li>
                            <li><a className="js-copy-list" href="#">Copy list…</a></li>
                            <li><a className="js-move-list" href="#">Move list…</a></li>
                            <li><a className="highlight-icon js-list-subscribe" href="#">Watch </a></li>
                        </ul>
                        <div className="js-list-menu-butler-section">
                            <div className="js-react-root">
                                <hr />
                                <div className="iTOZulvJIn04qL">
                                    <div className="xxzBa45Ub22ZmM">Automation</div>
                                </div>
                                <ul className="pop-over-list gvw20E0CVKp3lD">
                                    <li><a className="L335qyUj3ifsXN" role="link" title="When a card is added to the list…" tabIndex="0">When a card is added to the list…</a></li>
                                    <li><a className="L335qyUj3ifsXN" role="link" title="Every day, sort list by…" tabIndex="0">Every day, sort list by…</a></li>
                                    <li><a className="L335qyUj3ifsXN" role="link" title="Every Monday, sort list by…" tabIndex="0">Every Monday, sort list by…</a></li>
                                    <li><a className="r0UsGesljUa4jS" role="link" title="Create a rule" tabIndex="0"><span className="SHtfI_OwzcXzf6">Create a rule</span><span className="AhQ2N8Parscp7C"><span className="nch-icon A3PtEe1rGIm_yL J2CpPoHYfZ2U6i"><span data-testid="ExternalLinkIcon" aria-hidden="true" className="css-snhnyn" style={{ '--icon-primary-color': 'var(--ds-icon, #42526E)', '--icon-secondary-color': 'inherit' }}><svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.745 8.6082C10.742 8.0352 11.204 7.5722 11.776 7.5722H11.78L15.941 7.5912C16.515 7.5942 16.983 8.0622 16.986 8.6362L17.005 12.7972C17.006 13.3712 16.543 13.8352 15.969 13.8322C15.394 13.8302 14.926 13.3622 14.924 12.7882L14.9163 11.0759L8.19297 17.7992C7.80197 18.1892 7.16797 18.1892 6.77797 17.7992C6.38797 17.4092 6.38797 16.7752 6.77797 16.3842L13.5013 9.66089L11.789 9.6532C11.215 9.6512 10.747 9.1832 10.745 8.6082Z" fill="currentColor"></path></svg></span></span></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <hr />
                        <ul className="pop-over-list">
                            <li><a className="js-move-cards" href="#">Move all cards in this list…</a></li>
                            <li><a className="js-archive-cards" href="#">Archive all cards in this list…</a></li>
                        </ul>
                        <hr />
                        <ul className="pop-over-list">
                            <li><a className="js-close-list" href="#">Archive this list</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListActions;
